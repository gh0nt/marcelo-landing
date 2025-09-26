-- Crear tabla para almacenar contactos
-- Ejecutar este script en tu proyecto de Supabase

CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  project_type TEXT,
  message TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'replied')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS contacts_created_at_idx ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS contacts_status_idx ON contacts(status);
CREATE INDEX IF NOT EXISTS contacts_email_idx ON contacts(email);

-- Crear función para actualizar el campo updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Crear trigger para actualizar updated_at automáticamente
CREATE TRIGGER update_contacts_updated_at
    BEFORE UPDATE ON contacts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Habilitar Row Level Security (RLS)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Crear políticas de seguridad
-- Solo permitir insertar desde la aplicación (usando service role)
CREATE POLICY "Allow insert for service role" ON contacts
  FOR INSERT WITH CHECK (true);

-- Permitir leer solo a usuarios autenticados o con service role
CREATE POLICY "Allow read for authenticated users" ON contacts
  FOR SELECT USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- Permitir actualizar solo a usuarios autenticados o con service role
CREATE POLICY "Allow update for authenticated users" ON contacts
  FOR UPDATE USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- Comentarios para documentación
COMMENT ON TABLE contacts IS 'Tabla para almacenar mensajes de contacto del portfolio';
COMMENT ON COLUMN contacts.id IS 'Identificador único del contacto';
COMMENT ON COLUMN contacts.name IS 'Nombre completo del contacto';
COMMENT ON COLUMN contacts.email IS 'Dirección de email del contacto';
COMMENT ON COLUMN contacts.subject IS 'Tipo de proyecto o asunto (valor del select)';
COMMENT ON COLUMN contacts.project_type IS 'Alias para subject, mantiene compatibilidad';
COMMENT ON COLUMN contacts.message IS 'Mensaje del contacto';
COMMENT ON COLUMN contacts.ip_address IS 'Dirección IP desde donde se envió el mensaje';
COMMENT ON COLUMN contacts.user_agent IS 'User agent del navegador';
COMMENT ON COLUMN contacts.status IS 'Estado del contacto: pending, reviewed, replied';
COMMENT ON COLUMN contacts.created_at IS 'Fecha y hora de creación del registro';
COMMENT ON COLUMN contacts.updated_at IS 'Fecha y hora de última actualización del registro';