export namespace events {
  /** Краткое описание события */
  export interface IShortEvent {
    /** id события */
    id?: string;
    /** Заголовок события */
    title: string;
    /**
     * Аттрибуты
     * @see IAttributes
     */
    attributes: IAttributes;
  }

  /** Полное описание события */
  export interface IEvent extends IShortEvent {
    /**
     * Контент события
     * @see IContent
     */
    content: IContent;
  }

  /** Аттрибуты события */
  export interface IAttributes {
    /** Дата начала события */
    startDate: string;
    /** Дата окончания события */
    endDate: string;
    /** Дата создания */
    createDate: string;
    /**
     * Тип события
     * @see Type
     */
    type: Type;
    /**
     * Вид события
     * @see Event
     */
    event: Event;
    /** Напоминание */
    reminded: IReminded;
  }

  /** Контент события */
  export interface IContent {
    /** Текстовое описание */
    description?: string;
  }

  /** Напоминание о событии */
  export interface IReminded {
    /** Установка времени напоминания перед событием, если reminderTime==true */
    reminderTime?: string;
    /** Флаг установки напоминания */
    needToReminded?: boolean;
  }

  /**
   * Тип события
   * - regular: обычное
   * - obligatory: важное
   * - urgent: срочное
   */
  export type Type = 'regular' | 'important' | 'urgent';

  /**
   * Вид события
   * - встреча: meeting
   * - напоминание: reminder
   * - другое: other
   */
  export type Event = 'meeting' | 'reminder' | 'other';
}
