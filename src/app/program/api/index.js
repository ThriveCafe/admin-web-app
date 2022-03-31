import { API } from 'aws-amplify'
import { propOr } from 'ramda'

import handleApiError from '@/utils/handle-api-error'

const ProgramApis = {
  getAllPrograms: () => API.get('user', '/program', {}).catch(handleApiError),
  getProgram: (id) =>
    API.get('user', `/program/${id}`, {}).catch(handleApiError),
  createProgram: () => API.post('user', '/program', {}).catch(handleApiError),
  updateProgram: (data) =>
    API.put('user', '/program', {
      body: data,
    }).catch(handleApiError),
  deleteProgram: (id) =>
    API.del('user', `/program/${id}`, {}).catch(handleApiError),
  getFileUploadUrl: ({ type, id, contentType, extension }) =>
    API.post('user', '/program/upload-url', {
      body: {
        type,
        id,
        contentType,
        extension,
      },
    })
      .then(propOr('', 'url'))
      .catch(handleApiError),
}

export default ProgramApis
