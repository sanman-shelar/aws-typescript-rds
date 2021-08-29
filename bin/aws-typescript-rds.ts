#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { AwsTypescriptRdsStack } from "../lib/aws-typescript-rds-stack";

const app = new cdk.App();
new AwsTypescriptRdsStack(app, "AwsTypescriptRdsStack", {});
