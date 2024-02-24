export class StaffPassID {
    private constructor(private readonly id: string) {}
  
    static create(id: string): StaffPassID {
      if (!id) throw new Error("StaffPassID cannot be empty");
      return new StaffPassID(id);
    }
  
    get value(): string {
      return this.id;
    }
  }