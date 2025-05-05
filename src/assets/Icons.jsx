import Icons from "./sprite.svg";

const Icon = ({ id, className }) => {
  return (
    <svg className={className}>
      <use href={Icons + id} />
    </svg>
  );
};
export default Icon;
