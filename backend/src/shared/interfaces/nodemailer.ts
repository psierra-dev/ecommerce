export interface IEmailProvider {
    sendVerificationEmail(to: string, name: string, token: string): Promise<void> 
}