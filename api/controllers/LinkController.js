const nanoId = require('nanoid');
const Link = require('../models/Link');
const { customAlphabet } = require('nanoid');

exports.storeLink = async (req,res) => {
    const customAlphabetString = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const generateCustomNanoid = customAlphabet(customAlphabetString, 6);
    const generatedUniqueId = generateCustomNanoid();


    const link = req.body.inputLink;
    const uniqueId = generatedUniqueId;
    const shortenedLink = `https://link-sail-eta.vercel.app/l/${uniqueId}`
    const createdLink = new Link({

        linkUrl:link,
        linkVisits:0,
        uniqueId: uniqueId,
        shortenedLink : shortenedLink

    });

    createdLink.save().then(() => {
        console.log('200 Success');
        res.status(200).send(uniqueId);
    }).catch(err => {
        console.error(err);
        res.status(500).send('Internal Server Error');
    })
};

exports.indexAnalyticsLink = async (req,res) => {

    const uniqueId = req.params.id

    Link.findOne({
        uniqueId : uniqueId
    }).then(link => {
        res.status(200).send(link)
    }).catch(err => {
        res.status(500).send("Bad..")
    })
}

exports.storePageVisit = async (req, res) => {
  const uniqueId = req.params.id;
  Link.findOneAndUpdate(
    { uniqueId: uniqueId },
    { $inc: { linkVisits: 1 } },
    { new: true }
  )
    .then((link) => {
      if (!link) {
        return res.status(404).send("Link not found.");
      }
      res.json(link);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal Server Error");
    });
};
