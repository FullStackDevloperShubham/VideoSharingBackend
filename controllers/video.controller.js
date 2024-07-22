import { createError } from '../error.js'
import Video from '../models/Video.model.js'
import User from '../models/user.model.js'


//add video
export const addVideo = async (req, res, next) => {
  const newVideo = new Video({ userId: req.user.id, ...req.body })
  try {
    const savedVideo = await newVideo.save()
    res.status(200).json(savedVideo)
  } catch (error) {
    next(error)
  }
}

//Update video
export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id)

    if (!video) return next(createError(404, "Video not found"))

    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(req.params.id, {
        $set: req.body
      }, { new: true })
      res.status(200).json(updatedVideo)
    } else {
      return next(createError(403, "You can only update your video"))
    }
  } catch (error) {
    next(error)
  }
}

//Delete a video
export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id)

    if (!video) return next(createError(404, "Video not found"))

    if (req.user.id === video.userId) {
      await Video.findByIdAndDelete(req.params.id)
      res.status(200).json("The video was deleted")
    } else {
      return next(createError(403, "You can only delete your video"))
    }
  } catch (error) {
    next(error)
  }

}

//get a video
export const getVideo = async (req, res, next) => {

  try {
    const video = await Video.findById(req.params.id)
    res.status(200).json(video)

  } catch (error) {
    next(error)
  }

}

//view
export const addView = async (req, res, next) => {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 }
    })
    res.status(200).json("The view has been increased")
  } catch (error) {
    next(error)
  }
}


//random video
export const random = async (req, res, next) => {
  try {
    const videos = await Video.aggregate([{ $sample: { size: 40 } }])
    res.status(200).json(videos)
  } catch (error) {
    next(error)
  }
}


//trending video
export const trend = async (req, res, next) => {
  try {
    const videos = await Video.find().sort({ views: -1 })
    res.status(200).json(videos)
  } catch (error) {
    next(error)
  }
}

//subscribed
export const sub = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
    // console.log(user)
    const subscribedChannels = user.subscribedUsers
    console.log(subscribedChannels)

    const list = await Promise.all(
      subscribedChannels.map((channelId) => {
        return Video.find({ userId: channelId })
      })
    )

    res.status(200).json(list)

  } catch (error) {
    next(error)
  }
}



//get by tags
export const getByTag = async (req, res, next) => {

  const tags = req.query.tags.split(',')

  try {
    const videos = await Video.find({ tags: { $in: tags } }).limit(20)
    res.status(200).json(videos)
  } catch (error) {
    next(error)
  }
}

//search
export const search = async (req, res, next) => {
  const query = req.query.q

  try {
    const videos = await Video.find({ title: { $regex: query, $options: "i" } }).limit(40)
    res.status(200).json(videos)
  } catch (error) {
    next(error)
  }
}


