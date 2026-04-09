-- 1. Añadir la columna user_id a la tabla existente
ALTER TABLE public.scraped_products ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id);

-- 2. Crear tabla de perfiles para manejar roles (admin / user)
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid REFERENCES auth.users(id) PRIMARY KEY,
  role text DEFAULT 'user' NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Crear función trigger para asignar automáticamente un perfil a nuevos usuarios registrados
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, role)
  VALUES (new.id, 'user');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Vincular el trigger a auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Nota para convertir a alguien en admin:
-- UPDATE public.profiles SET role = 'admin' WHERE id = 'el-uuid-del-usuario';