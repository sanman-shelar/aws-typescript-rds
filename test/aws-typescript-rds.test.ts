import { expect as expectCDK, matchTemplate, MatchStyle, haveResource } from "@aws-cdk/assert";
import * as cdk from "@aws-cdk/core";
import * as AwsTypescriptRds from "../lib/aws-typescript-rds-stack";

test("RDS Stack", () => {
  const app = new cdk.App();
  // WHEN
  const stack = new AwsTypescriptRds.AwsTypescriptRdsStack(app, "MyTestStack");
  // THEN
  expectCDK(stack).to(haveResource("AWS::Lambda::Function"));
});
