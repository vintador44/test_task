export default class HumanClass {
  constructor(name, surname, gender, birthDate) {
      this.name = name;
      this.surname = surname;
      this.gender = gender;
      this.birthDate = birthDate;
      this.children = [];
  }

  addChild(child) {
    if (this.children.length <2)
      this.children.push(child);
  }

  removeChild(childName) {
      this.children = this.children.filter(child => child.name !== childName);
  }
}
