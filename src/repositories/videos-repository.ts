interface Video { 
    id: number; 
    title: string; 
    author: string; 
    canBeDownloaded: boolean; 
    minAgeRestriction: null; 
    createdAt: string; 
    publicationDate: string; 
    availableResolutions: any }

enum AvailableResolutions  {
   P144 = 'P144', 
   P240 = 'P240', 
   P360 = 'P360', 
   P480 = 'P480', 
   P720 = 'P720', 
   P1080 = 'P1080', 
   P1440 = 'P1440', 
   P2160 = 'P2160' 
}

export let videos: Video[] = []

const  availableResolutionsArray = ['P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160' ]

function isIsoDate(str: string ) {
  if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) return false;
  const d = new Date(str); 
  return d instanceof Date &&  d.toISOString()===str; // valid date 
}



export const videosRepository = {
deleteAllVideo: () => {
    videos = []
    return videos
},
getAllVideos: () => {
    return videos
},
createVideo: (body: {title: string, author: string, availableResolutions: typeof availableResolutionsArray}) => {

    const {title, author, availableResolutions} = body 
    if (title?.length <= 40 && typeof title === 'string' 
    && author?.length <= 20 && typeof author === 'string'
    && availableResolutions.every( (ai: string) => availableResolutionsArray.includes(ai)) ) {
      const date = new Date()
      const tomorow = new Date()
      tomorow.setDate(date.getDate() + 1)
      const video = {
        "id": new Date().getTime(),
        "title": title,
        "author": author,
        "canBeDownloaded": false,
        "minAgeRestriction": null,
        "createdAt": new Date().toISOString(),
        "publicationDate": tomorow.toISOString(),
        "availableResolutions": availableResolutions
      }
      videos.push(video)
      return {video: video}
    }
    else {
      const errors = []
      if (!title || title?.length > 40 || typeof title !== 'string') errors.push({
        "message": "string",
        "field": "title"
      })
      if (!author|| author.length > 20 || typeof author !== 'string' ) errors.push({
        "message": "string",
        "field": "author"
      })
      if (!availableResolutions.every( (ai: string) => availableResolutionsArray.includes(ai))) errors.push({
        "message": "string",
        "field": "availableResolutions"
      })
      return  {errors: errors}
    }
},

findVideo: (id: number) => {
    const video = videos.find(v => v.id === id)
    return video
},

updateVideo: (
    body: {title: string; author: string; availableResolutions: typeof availableResolutionsArray; canBeDownloaded: boolean; minAgeRestriction: null, publicationDate: string},
    videoId: number
    ) => {
    const {title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate} = body 
    const video = videos.find(v => v.id === videoId)
    if (video && videoId) {
      if (title?.length <= 40 && typeof title === 'string' &&
       author?.length <= 20 && typeof author === 'string' && 
       minAgeRestriction  && minAgeRestriction <= 18 &&
       publicationDate && isIsoDate(publicationDate) &&
       canBeDownloaded && typeof canBeDownloaded === 'boolean' &&  minAgeRestriction && publicationDate) {
       video.title = title
       video.author = author
       video.availableResolutions = availableResolutions
       video.canBeDownloaded = canBeDownloaded
       video.minAgeRestriction = minAgeRestriction
       video.publicationDate = publicationDate
       return {isUpdated: true}
    }
    else {
      const errors = []
      if (!title ||  title?.length > 40 || typeof title !== 'string') errors.push({
        "message": "string",
        "field": "title"
      })
      if (!author ||  author?.length > 20 || typeof author !== 'string' ) errors.push({
        "message": "string",
        "field": "author"
      })
      if (!canBeDownloaded || typeof canBeDownloaded !== 'boolean' ) errors.push({
        "message": "string",
        "field": "canBeDownloaded"
      })
      if (!minAgeRestriction  || minAgeRestriction > 18) errors.push({
        "message": "string",
        "field": "minAgeRestriction"
      })
      if (!publicationDate  || !isIsoDate(publicationDate)) errors.push({
        "message": "string",
        "field": "publicationDate"
      })

      return {errors: errors}
      }
   }
},
removeVideo: (id: number) => {
    const video = videos.find(v => v.id === id)
  if (video && id) {
  const videoIndex = video && videos.indexOf(video)
  console.log('videoId', id, 'video',video ,'videoIndex',videoIndex );
   videos.splice(videoIndex, 1)
return true
  }
}
}