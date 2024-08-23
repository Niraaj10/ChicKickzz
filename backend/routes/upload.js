const router = require('express').Router()
const cloudinary = require('cloudinary')
const auth = require('../middleware/auth')
const adminAuth = require('../middleware/adminAuth')
const fs = require('fs')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

// router.post('/upload',auth,adminAuth, (req,res)=> {
router.post('/upload', async (req, res) => {
    try {
        // res.json(req.files)
        if (!req.files || Object.keys(req.files).length === 0)
            return res.status(400).send({ msg: "No file were uploaded" })
        //  return res.json(req.files)
        console.log(req.files)

        // const file = req.files.file;
        let files = req.files.files;
        if (!Array.isArray(files)) {
            files = [files]; // Ensure it's an array
        }

        const uploadedfiles = [];

        for (const file of files) {

            if (file.size > 1024 * 1024 * 5) {
                removeTmp(file.tempFilePath)
                return res.status(400).json({ msg: "Size too large" })
            }

            if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
                removeTmp(file.tempFilePath)
                return res.status(400).json({ msg: "File format is incorrect" })
            }

            // cloudinary.v2.uploader.upload(file.tempFilePath,{folder:'test'},async(err,result) => {
            //     if(err) throw err;

            //     removeTmp(file.tempFilePath)

            //     res.json({public_id:result.public_id,url:result.secure_url})
            // })

            const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
                folder: 'test',
                quality: 'auto:best'
            });

            removeTmp(file.tempFilePath);

            uploadedfiles.push({ public_id: result.public_id, url: result.secure_url });

        }
        res.json(uploadedfiles)

    } catch (err) {
        res.status(500).json({ msg: err.message })
    }
})

router.post('/destroy', auth, adminAuth, (req, res) => {
    try {
        const { public_id } = req.body;
        if (!public_id) return res.status(400).json({ msg: "No images Selected" })

        cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
            if (err) throw err

            res.json({ msg: "Deleted" })
        })
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
})

const removeTmp = (path) => {
    fs.unlink(path, err => {
        if (err) throw err;
    })
}

module.exports = router