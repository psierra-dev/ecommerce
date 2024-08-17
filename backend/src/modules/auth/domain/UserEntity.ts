export class UserEntity {
    public id?: string; // ID opcional en la inicialización
    public name: string;
    public email: string;
    private password: string;
    public role: "client" | "admin";
    public readonly createdAt: Date;

    constructor(id: string ,name: string, email: string, role: "client" | "admin" = "client", password: string, createdAt: Date) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role
        this.password = password;
        this.createdAt = createdAt;
    }

    public getPassword(): string {
        return this.password;
    }

    // Método para cambiar la password
    public setPassword(newPassword: string): void {
        this.password = newPassword;
    }
}