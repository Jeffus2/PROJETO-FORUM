const id = JSON.parse(localStorage.getItem("usuario")).id;

export default function perfil({ id }) {
  return <div>{`ola ID${id}`}</div>;
}
