import { KanjiType } from "../../pages/japanese/kanji";
import style from "../../styles/components/japanese/kanji.module.scss";

export default ({
  kanji,
  remove,
  edit,
}: {
  kanji: KanjiType;
  remove: () => void;
  edit: () => void;
}) => {
  return (
    <div className={style.kanji_container}>
      {/* <span onClick={remove} className={style.remove}>
        x
      </span> */}
      <span>{kanji.kanji}</span>
      <div className={style.clickable} onClick={edit} />
    </div>
  );
};
