export class LocationDetailsDto {
  public id: number;
  public name: string;
  public categories: string[];
  public categoriesIds: number[];
  public capacity: number;


  constructor(id: number, name: string, categories: string[], categoriesIds: number[], capacity: number) {
    this.id = id;
    this.name = name;
    this.categories = categories;
    this.categoriesIds = categoriesIds;
    this.capacity = capacity;
  }
}
