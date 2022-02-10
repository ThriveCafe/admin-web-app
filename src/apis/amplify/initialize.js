import { Amplify } from 'aws-amplify'

import AwsConfig from '@/config/aws-config'

const { cognito, s3, apiGateway } = AwsConfig

let initialized = false

const initializeAmplify = () => {
  if (initialized) {
    return
  }

  initialized = true

  Amplify.configure({
    Auth: {
      mandatorySignIn: true,
      region: cognito.REGION,
      userPoolId: cognito.USER_POOL_ID,
      identityPoolId: cognito.IDENTITY_POOL_ID,
      userPoolWebClientId: cognito.APP_CLIENT_ID,
    },
    Storage: {
      region: s3.REGION,
      bucket: s3.BUCKET,
      identityPoolId: cognito.IDENTITY_POOL_ID,
    },
    API: {
      endpoints: [
        {
          name: 'user',
          endpoint: apiGateway.URL,
          region: apiGateway.REGION,
        },
      ],
    },
  })
}

export default initializeAmplify
