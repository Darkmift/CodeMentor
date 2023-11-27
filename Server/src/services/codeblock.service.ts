import CodeBlock, { ICodeBlock } from '../models/message-model';

export async function getCodeBlocks(roomName: string): Promise<ICodeBlock> {
  try {
    const codeBlock = await CodeBlock.findOne({ roomName: roomName });
    return codeBlock;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateCodeBlock(code: string, roomName: string): Promise<ICodeBlock | null> {
  try {
    // Find the code block document by room name
    const codeBlock = await CodeBlock.findOne({ roomName: roomName });

    if (codeBlock) {
      // Update the code field
      codeBlock.code = code;

      // Save the updated document
      await codeBlock.save();

      return codeBlock;
    } else {
      // Handle case where no document is found
      console.log(`No code block found for room: ${roomName}`);
      return null;
    }
  } catch (error) {
    console.error(`Error updating code block in room ${roomName}:`, error);
    return null;
  }
}
