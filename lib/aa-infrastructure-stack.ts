import { Duration, Stack, StackProps } from 'aws-cdk-lib'
import * as s3 from 'aws-cdk-lib/aws-s3'
import { BlockPublicAccess } from 'aws-cdk-lib/aws-s3'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins'
import { Construct } from 'constructs'

export class AAInfrastructureStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const bucket = new s3.Bucket(this, 'AAWeb', {
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
    })
    const origin = new origins.S3Origin(bucket)

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
      defaultRootObject: '/index.html',
      priceClass: cloudfront.PriceClass.PRICE_CLASS_200,
    })
  }
}
