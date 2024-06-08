import express from 'express'
import { getCurrentData } from '../controllers/data.js'

const router = express.Router()

router.route("/price").get(getCurrentData)

export default router