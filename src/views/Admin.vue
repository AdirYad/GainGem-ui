<template>
  <div>
    <div class="tw-flex tw-flex-col lg:tw-flex-row">
      <div class="tw-flex tw-flex-1 tw-bg-white tw-shadow-md">
        <Tabs class="tw-min-h-12 tw-w-full">
          <Tab name="Account Details" query="details">
            <Details />
          </Tab>
          <Tab name="Transactions" query="transactions">
            <Transactions />
          </Tab>
          <Tab name="Activity" query="activity">
            <Activity />
          </Tab>
          <Tab name="Referrals" query="referrals">
            <Referrals />
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
import Details from "@/components/Profile/Details";
import Transactions from "@/components/Profile/Transactions";
import Activity from "@/components/Profile/Activity";
import Referrals from "@/components/Profile/Referrals";

export default {
  name: 'Admin',
  components: {
    Tab,
    Tabs,
    RewardStock,
    PromoCodes,
    Users,
    AnnouncementBanner,
    Details,
    Transactions,
    Activity,
    Referrals,
  },
}
</script>