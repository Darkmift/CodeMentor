import './RoomList.css';

type Props = { roomList: string[]; setRoomName: (roomName: string) => void };

function RoomList({ roomList, setRoomName }: Props) {
  const handleRoomSelect = (room: string) => {
    setRoomName(room);
  };
  return (
    <div>
      {roomList.map((room: string) => (
        <div className="room-btn" key={room} onClick={() => handleRoomSelect(room)}>
          {room.toUpperCase()}
        </div>
      ))}
    </div>
  );
}

export default RoomList;
