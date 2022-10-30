class Item {
  name;
  value;

  constructor(name, value) {
    this.name = name.toUpperCase().trim();
    this.value = value;
  }
}

export default Item;
