type SquareBoxProps = {
  name: string;
  username: string;
  id: null
}

export const SquareBox = ({name, username}: SquareBoxProps) => {
  return <div className="square">
    <h1>username: {username}</h1>
    <h1>name: {name}</h1>
  </div>
}