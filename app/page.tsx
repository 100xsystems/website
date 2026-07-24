import { HomeFeed } from '@/presentation/features/homeFeed.feature';
import { HomeSearch } from '@/presentation/features/homeSearch.feature';

export default function HomePage() {
  return (
    <>
      <HomeFeed />
      <HomeSearch />
    </>
  );
}
