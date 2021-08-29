import { Effect, PolicyStatement } from "@aws-cdk/aws-iam";
import { Runtime } from "@aws-cdk/aws-lambda";
import { NodejsFunction } from "@aws-cdk/aws-lambda-nodejs";
import * as cdk from "@aws-cdk/core";
import * as path from "path";

export class AwsTypescriptRdsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    let testLambda = new NodejsFunction(this, "testLambda", {
      handler: "handler",
      entry: path.join(__dirname, `/../lambda/test.ts`),
      functionName: "testLambda",
      memorySize: 1024,
      runtime: Runtime.NODEJS_14_X,
      timeout: cdk.Duration.seconds(5),
      bundling: {
        minify: true,
      },
    });

    let statement = new PolicyStatement({
      actions: ["rds:*"],
      effect: Effect.ALLOW,
      resources: ["*"],
    });
    testLambda.addToRolePolicy(statement);
  }
}
