import { auth } from '@/auth';
import { NavAuthBtn } from './NavAuthBtn';
import { NavSearch } from './NavSearch';
import { NavLinks } from './NavLinks';

export async function Navigation() {
  const session = await auth();

  return (
    <nav className='flex size-full items-center'>
      <NavLinks />
      <div className='ml-auto flex items-center gap-14'>
        <NavSearch />
        <NavAuthBtn session={session} />
      </div>
    </nav>
  );
}
