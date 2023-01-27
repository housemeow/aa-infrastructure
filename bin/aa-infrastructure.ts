#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib'
import { AAInfrastructureStack } from '../lib/aa-infrastructure-stack'

const app = new cdk.App()
new AAInfrastructureStack(app, 'AAInfrastructureStack')
