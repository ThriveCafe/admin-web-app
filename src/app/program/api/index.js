import { API } from 'aws-amplify'
import { propOr } from 'ramda'

import handleApiError from '@/utils/handle-api-error'

const ProgramApis = {
  getAllPrograms: () =>
    API.get('user', '/program-admin', {}).catch(handleApiError),
  getProgram: (id) =>
    API.get('user', `/program-admin/${id}`, {}).catch(handleApiError),
  getProgramRegistrations: (id) =>
    API.get('user', `/program/${id}/registration-option`, {}).catch(
      handleApiError,
    ),
  createProgramRegistrationOption: ({
    id,
    type,
    title,
    price,
    schedule,
    registrationLimit,
  }) =>
    API.post('user', '/program/registration-option', {
      body: { id, type, title, price, schedule, registrationLimit },
    }).catch(handleApiError),
  deleteProgramRegistrationOption: ({ id, optionId }) =>
    API.del('user', `/program/${id}/registration-option/${optionId}`, {}).catch(
      handleApiError,
    ),
  createProgram: () => API.post('user', '/program', {}).catch(handleApiError),
  updateProgram: (data) =>
    API.put('user', '/program', {
      body: data,
    }).catch(handleApiError),
  deleteProgram: (id) =>
    API.del('user', `/program/${id}`, {}).catch(handleApiError),
  deleteProgramCover: (id, type) =>
    API.del('user', `/program/${id}/cover/${type}`, {}).catch(handleApiError),
  getQuizProgramMap: (programId) =>
    API.get('user', `/quiz-program/${programId}`, {}).catch(handleApiError),
  deleteQuizProgramMap: (programId, quizId) =>
    API.del('user', `/quiz-program/${programId}/${quizId}`, {}).catch(
      handleApiError,
    ),
  createQuizProgramMap: (programId, quizId, sessionIndex) =>
    API.post('user', `/quiz-program`, {
      body: { programId, quizId, sessionIndex },
    }).catch(handleApiError),
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
