const mongoose = require("mongoose");
const { marked }   = require("marked");
const createDomPurify = require("dompurify");
const{ JSDOM } = require("jsdom");
const dompurify = createDomPurify(new JSDOM().window);
const punycode = require('punycode');

const articleSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
    },
    markdown:{
        type: String,
        required: true,
    },
    created_at:{
        type: Date,
        default: Date.now,
    },
    sanitizedHTML:{
        type: String,
        required: true,
    }
    
})
articleSchema.pre('validate', function (next) {

  if(this.markdown){
    this.sanitizedHTML = dompurify.sanitize(marked(this.markdown))
}
next();
});





module.exports = mongoose.model("Article", articleSchema);