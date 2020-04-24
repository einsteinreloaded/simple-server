import mongoose from "mongoose";
const Schema = mongoose.Schema;

const blogSchema = new Schema({
	title: String,
	author: String,
	body: String,
	comments: [{ body: String, date: Date }],
	date: { type: Date, default: Date.now },
	hidden: Boolean,
	meta: {
		votes: Number,
		favs: Number,
	},
});
blogSchema.index({ author: 1, title: 1 }, { unique: true });

export const Blog = mongoose.model("blog", blogSchema);
