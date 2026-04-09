-- ENUMS
CREATE TYPE user_role AS ENUM ('visitor', 'member', 'admin');
CREATE TYPE event_status AS ENUM ('draft', 'published', 'unpublished');
CREATE TYPE event_category AS ENUM ('workshop', 'hackathon', 'talk', 'competition', 'social');
CREATE TYPE challenge_difficulty AS ENUM ('easy', 'medium', 'hard');
CREATE TYPE challenge_category AS ENUM ('ui_ux', 'full_stack', 'api_design', 'open_innovation');
CREATE TYPE challenge_status AS ENUM ('active', 'ended', 'draft');
CREATE TYPE submission_status AS ENUM ('pending', 'reviewed', 'graded');
CREATE TYPE rank_badge AS ENUM ('newbie', 'contributor', 'expert', 'legend');

-- PROFILES
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  tech_stack TEXT[] DEFAULT '{}',
  role user_role DEFAULT 'visitor',
  rank rank_badge DEFAULT 'newbie',
  total_score INTEGER DEFAULT 0,
  is_banned BOOLEAN DEFAULT false,
  notification_preferences JSONB DEFAULT '{"email": true, "events": true, "challenges": true}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- TEAM MEMBERS
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  photo_url TEXT,
  designation TEXT NOT NULL,
  hierarchy_level INTEGER NOT NULL, -- 1=Lead, 2=Core, 3=Member
  batch_year TEXT,
  domain TEXT,
  skills TEXT[] DEFAULT '{}',
  github_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  is_alumni BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- EVENTS
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  banner_image_url TEXT,
  event_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ,
  venue TEXT,
  mode TEXT DEFAULT 'offline',
  category event_category NOT NULL,
  status event_status DEFAULT 'draft',
  schedule JSONB,
  speakers JSONB,
  faqs JSONB,
  registration_count INTEGER DEFAULT 0,
  results JSONB,
  gallery_album_id UUID,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- EVENT REGISTRATIONS
CREATE TABLE event_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  registered_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(event_id, user_id)
);

-- CHALLENGES
CREATE TABLE challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  problem_statement TEXT NOT NULL,
  difficulty challenge_difficulty NOT NULL,
  category challenge_category NOT NULL,
  status challenge_status DEFAULT 'draft',
  deadline TIMESTAMPTZ NOT NULL,
  scoring_rules JSONB,
  tags TEXT[] DEFAULT '{}',
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- SUBMISSIONS
CREATE TABLE submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  challenge_id UUID REFERENCES challenges(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  github_url TEXT NOT NULL,
  live_url TEXT,
  score INTEGER,
  feedback TEXT,
  status submission_status DEFAULT 'pending',
  submitted_at TIMESTAMPTZ DEFAULT now(),
  graded_at TIMESTAMPTZ
);
CREATE UNIQUE INDEX unique_active_submission ON submissions(challenge_id, user_id);

-- PROJECTS
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  extended_description TEXT,
  thumbnail_url TEXT,
  screenshots TEXT[] DEFAULT '{}',
  tech_stack TEXT[] DEFAULT '{}',
  team_members_names TEXT[] DEFAULT '{}',
  github_url TEXT,
  live_url TEXT,
  documentation_url TEXT,
  domain TEXT,
  year TEXT,
  team_size INTEGER DEFAULT 1,
  is_featured BOOLEAN DEFAULT false,
  is_archived BOOLEAN DEFAULT false,
  likes_count INTEGER DEFAULT 0,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- PROJECT LIKES
CREATE TABLE project_likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(project_id, user_id)
);

-- GALLERY ALBUMS
CREATE TABLE gallery_albums (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  event_name TEXT,
  event_date TIMESTAMPTZ,
  cover_image_url TEXT,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- GALLERY IMAGES
CREATE TABLE gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  album_id UUID REFERENCES gallery_albums(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  display_order INTEGER DEFAULT 0,
  uploaded_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ANNOUNCEMENTS
CREATE TABLE announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- AUDIT LOG
CREATE TABLE audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES profiles(id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- INDEXES
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_challenges_status ON challenges(status);
CREATE INDEX idx_submissions_challenge ON submissions(challenge_id);
CREATE INDEX idx_submissions_user ON submissions(user_id);
CREATE INDEX idx_gallery_images_album ON gallery_images(album_id);
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_score ON profiles(total_score DESC);

-- ROW LEVEL SECURITY
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Public read events" ON events FOR SELECT USING (status = 'published');
CREATE POLICY "Admin manage events" ON events FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Public read challenges" ON challenges FOR SELECT USING (status != 'draft');
CREATE POLICY "Members submit" ON submissions FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('member', 'admin'))
);
CREATE POLICY "Users read own submissions" ON submissions FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (is_archived = false);

-- AUTH TRIGGER: auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id, NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();