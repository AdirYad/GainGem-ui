<template>
  <div>
    <div class="tw-flex tw-flex-col lg:tw-flex-row">
      <div class="tw-flex tw-flex-1 tw-bg-white tw-shadow-md">
        <Tabs class="tw-min-h-12 tw-w-full">
          <Tab name="Reward Stock" query="stock">
            <RewardStock />
          </Tab>
          <Tab name="Promo Codes" query="promo-codes">
            <PromoCodes />
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
import PromoCodes from '@/components/Admin/PromoCodes';
import Users from '@/components/Admin/Users';
import AnnouncementBanner from '@/components/Admin/AnnouncementBanner';

export default {
  name: 'Temp',
  components: {
    Tab,
    Tabs,
    RewardStock,
    PromoCodes,
    Users,
    AnnouncementBanner,
  }
}
</script>