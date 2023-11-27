import mongoose, { Document, Schema } from 'mongoose';

// Interface to describe a code block
export interface ICodeBlock extends Document {
  roomName: string;
  title: string;
  code: string;
}

// Mongoose schema for a code block
const codeBlockSchema: Schema = new Schema({
  roomName: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  code: {
    type: String,
    required: true,
  },
});

// Creating the model
const CodeBlock = mongoose.model<ICodeBlock>('CodeBlock', codeBlockSchema, 'code-blocks');

export default CodeBlock;
