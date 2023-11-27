const dummyDB = {
    roomData: [
      { roomName: "Room1", codeTitle: "Welcome Message", code: "const greeting = 'Hello, Room 1!';" },
      { roomName: "Room2", codeTitle: "Addition Function", code: "function add(a, b) { return a + b; }" },
      { roomName: "Room3", codeTitle: "List of Items", code: "const items = ['apple', 'banana', 'orange'];" },
      // Add more dummy room data as needed
    ],
    getCode: async (roomName: string): Promise<{ title: string; code: string }> => {
      const room = dummyDB.roomData.find((room) => room.roomName === roomName);
      return room ? { title: room.codeTitle, code: room.code } : { title: "", code: "" };
    },
    saveCode: async (roomName: string, codeTitle: string, code: string): Promise<void> => {
      // In a real implementation, you'd save code to the database
      // For this example, we'll just log the roomName, codeTitle, and code to the console
      console.log(`Saving code for room '${roomName}' with title '${codeTitle}':`, code);
    },
  };
  
  export default dummyDB;
  