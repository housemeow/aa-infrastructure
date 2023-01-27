import { Duration, Stack, StackProps } from 'aws-cdk-lib'
import * as cdk from 'aws-cdk-lib'
import * as s3 from 'aws-cdk-lib/aws-s3'
import { BlockPublicAccess } from 'aws-cdk-lib/aws-s3'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins'
import * as acm from 'aws-cdk-lib/aws-certificatemanager'
import { Construct } from 'constructs'

interface Props extends StackProps {
  domainName: string
}

export class AAInfrastructureStack extends Stack {
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props)

    const bucket = new s3.Bucket(this, 'AAWeb', {
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
    })
    const origin = new origins.S3Origin(bucket)

    const certificate = acm.Certificate.fromCertificateArn(this, 'AAWebCertificate', 'arn:aws:acm:us-east-1:319960151867:certificate/465be1dd-90d9-45b0-821f-459d14dac399')

    const dist = new cloudfront.Distribution(this, 'AAWebDistribution', {
      defaultBehavior: { origin },
      errorResponses: [
        {
          httpStatus: 403,
          ttl: Duration.seconds(10),
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
        }
      ],
      certificate: certificate,
      domainNames: [props.domainName],
      defaultRootObject: '/index.html',
      priceClass: cloudfront.PriceClass.PRICE_CLASS_200,
    })

    new cdk.CfnOutput(this, 'Website', { value: `https://${props.domainName}` })
  }
}
