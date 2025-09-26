-- Crear tabla para almacenar contactos
CREATE TABLE contacts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(255),
  project_type VARCHAR(100),
  message TEXT NOT NULL,
  ip_address INET,
  user_agent TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índice para búsquedas por email
CREATE INDEX idx_contacts_email ON contacts(email);

-- Crear índice para búsquedas por fecha
CREATE INDEX idx_contacts_created_at ON contacts(created_at);

-- Crear índice para búsquedas por estado
CREATE INDEX idx_contacts_status ON contacts(status);

-- Habilitar RLS (Row Level Security)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserción de contactos (público)
CREATE POLICY "Allow contact form submissions" ON contacts
  FOR INSERT WITH CHECK (true);

-- Política para permitir lectura solo a usuarios autenticados (para admin)
CREATE POLICY "Allow contact reading for authenticated users" ON contacts
  FOR SELECT USING (auth.role() = 'authenticated');

-- Crear función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Crear trigger para actualizar updated_at
CREATE TRIGGER update_contacts_updated_at
    BEFORE UPDATE ON contacts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();