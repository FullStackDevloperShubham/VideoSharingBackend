import { createError } from "../error.js"
import User from '../models/user.model.js'
import Video from '../models/video.model.js'


// update user 
export const update = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const updateUser = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body
      }, { new: true })
      res.status(200).json(updateUser)
    } catch (error) {
      next(error)
    }
  } else {
    return next(createError(403, "You can update only your account"))
  }
}


// delete user 
export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id)
      res.status(200).json("User has been deleted")
    } catch (error) {
      next(error)
    }
  } else {
    return next(createError(403, "You can Delete only your account"))
  }
}

// get user
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}

// subscribe
export const subscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $push: { subscribedUsers: req.params.id }
    })

    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: 1 }
    })

    res.status(200).json("Subscription successfully ")

  } catch (error) {
    next(error)
  }
}

// unsubscribe
export const unsubscribe = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedUsers: req.params.id }
    })

    await User.findByIdAndUpdate(req.params.id, {
      $inc: { subscribers: -1 }
    })

    res.status(200).json("un-Subscription successfully ")

  } catch (error) {
    next(error)
  }
}

export const like = async (req, res, next) => {
  const id = req.user.id
  const videoId = req.params.videoId

  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { likes: id },
      $pull: { $dislikes: id }
    })
    res.status(200).json("The video has been liked")
  } catch (error) {
    next(error)
  }

}
export const dislike = async (req, res, next) => {
  const id = req.user.id
  const videoId = req.params.videoId

  try {
    await Video.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: id },
      $pull: { $likes: id }
    })
    res.status(200).json("The video has been disliked")
  } catch (error) {
    next(error)
  }
}