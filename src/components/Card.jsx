export const Card = ({ title = "세션이름", description = "설명글" }) => {
  return (
    <div
      className="
        w-[240px]
        h-[280px]
        rounded-[20px]
        p-[28px_20px]
        flex
        flex-col
        gap-[9px]
        bg-gradient-to-b from-[#3F94FB] to-[#E4F2FF]
        flex flex-col justify-end
      "
    >
      <h3 className=" text-[18px] font-bold truncate">{title}</h3>
      <p className=" text-[14px] text-[#616672] truncate">{description}</p>
    </div>
  );
};

export default Card;
