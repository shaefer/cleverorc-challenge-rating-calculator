# challenge_rating_calculator

https://www.serverless.com/blog/cicd-for-serverless-part-1/
https://www.serverless.com/blog/cicd-for-serverless-part-2/

Getting started with Lambda isn't hard at all. But if you are shooting for a super simple API you are still left with a lot of boilerplate things and missing pieces to make it really useful. Each which have their own small gotchas. Testing, deployments, API Gateway, cors, staged deployments, database setup, roles, permissions, javascript modules, dependency install, etc. It can still be a decent amount of work to get to something straightforward: A datasource accessible through lambda driven by a restful API written with Javascript with no hoops for pulling in additional js dependencies. Serverless helps you get there without worrying about all that boilerplate.

## Do this first (prerequisites): 
- [Follow Serverless setup guide](https://www.serverless.com/framework/docs/providers/aws/guide/installation/) for 3 things:
    1. Install Node
    1. Install Serverless `npm install -g serverless`
        1. Install Webpack plugin: `serverless plugin install --name serverless-bundle` go to the [serverless docs](https://www.serverless.com/framework/docs/providers/aws/cli-reference/plugin-install/) for more details/info:
    1. Setup AWS - mostly setting up credentials

## Getting Started
1. Run it locally  This is like hitting your lambda live with the earlier mentioned URI. Also try the post. The get is to calculator a single creature field (like hp) the post is mean to include all the parts of a creature that are part of cr calculation (hp, ac, damage, toHit, saves, DCs)
`serverless invoke local --function calc --path test/cleverorc/get-hp.json`
`serverless invoke local --function calc --path test/cleverorc/post-hp.json`
`serverless invoke local --function calc --path test/cleverorc/post-fullWithNoCreatureType.json`
1. Run `serverless deploy` to create the lambda and dynamodb table in AWS. The output for the deploy will show success and give you the url for the deployed API gateway endpoint that you can hit to test it live.
1. *OPTIONAL BUT IMPORTANT*: If you forgot something and want to rollback...**BEFORE** you change anything in the serverless.yml just run a `serverless remove` and it will delete all the resources it just created...or try to. Since serverless created everything with Cloudformation it can remove it too. Find more details in the [serverless docs](https://www.serverless.com/framework/docs/providers/aws/cli-reference/remove/).
