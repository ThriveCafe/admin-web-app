const ProgramUploadTypes = {
  COVER_IMAGE: {
    name: 'COVER_IMAGE',
    allow: 'admin',
    isPublic: true,
  },
  COVER_VIDEO: {
    name: 'COVER_VIDEO',
    allow: 'admin',
    isPublic: true,
  },
  SEO_IMAGE: {
    name: 'SEO_IMAGE',
    allow: 'admin',
    isPublic: true,
  },
  GALLERY_IMAGE: {
    name: 'GALLERY_IMAGE',
    allow: 'admin',
    isPublic: true,
  },
  GALLERY_VIDEO: {
    name: 'GALLERY_VIDEO',
    allow: 'admin',
    isPublic: true,
  },
  RESOURCE_IMAGE: {
    name: 'RESOURCE_IMAGE',
    allow: 'admin',
    isPublic: false,
  },
  RESOURCE_VIDEO: {
    name: 'RESOURCE_VIDEO',
    allow: 'admin',
    isPublic: false,
  },
  RESOURCE_DOCUMENT: {
    name: 'RESOURCE_DOCUMENT',
    allow: 'admin',
    isPublic: false,
  },
}

export default ProgramUploadTypes
