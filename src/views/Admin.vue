<template>
  <div>
    <div class="tw-flex tw-flex-col lg:tw-flex-row">
      <div class="tw-flex tw-flex-1 tw-bg-white tw-shadow-md tw-mt-8 lg:tw-mt-0 lg:tw-ml-3 xl:tw-ml-6">
        <Tabs class="tw-min-h-12 tw-w-full">
          <Tab name="Reward Stock" query="stock">
            <RewardStock />
          </Tab>
          <Tab name="Users" query="users">
            <Users />
          </Tab>
          <Tab name="Announcement Banner" query="announcement-banner">
            <AnnouncementBanner />
          </Tab>
      </Tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Tab from '@/components/Tab'
import Tabs from "@/components/Tabs";
import RewardStock from '@/components/Admin/RewardStock';
import Users from '@/components/Admin/Users';
import AnnouncementBanner from '@/components/Admin/AnnouncementBanner';

export default {
  name: 'Admin',
  components: {
    Tab,
    Tabs,
    RewardStock,
    Users,
    AnnouncementBanner,
  },
}
</script>