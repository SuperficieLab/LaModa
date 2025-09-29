// layout.js
import "./globals.css";

export const metadata = {
    title: {
        default: 'Teste Roleta',
    },
    description: 'Produzido por Suplab',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className="h-screen bg-green">
      <body className="h-screen no-select no-drag">
        <div className="flex h-full items-center justify-center overflow-hidden bg-gradient-to-b from-pastel-blue to-blue">
          <main className="w-full h-full">
            <div className="h-full overflow-hidden bg-green phone-content">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}