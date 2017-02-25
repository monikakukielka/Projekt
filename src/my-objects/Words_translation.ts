export class Words_translation {
  public id_word_en : number;
  public id_word_pl : number;
  public word_en_name: string;
  public word_pl_name: string;
  public id_translation: number;
  public to_delete: boolean=false;
  public sentence_en: string;
  public sentence_pl: string;
  public to_edit: boolean=false;
  constructor(){

  }
}
