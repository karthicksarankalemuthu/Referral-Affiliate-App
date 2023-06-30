import { Frame,  Navigation} from "@shopify/polaris";
import { ShareMinor, ThumbsUpMajor,QuickSaleMajor,TransactionFeeRupeeMajor,PaymentsMajor, SettingsMajor} from '@shopify/polaris-icons';
import { useNavigate} from "@shopify/app-bridge-react"; 
import { useState } from "react";


  export default function Navbar() {
  const[open,setopen]=useState(false)
  const[open1,setopen1]=useState(false)
  const[open2,setopen2]=useState(false)
    const navigate = useNavigate();
    return (
        
        <Frame>
      <Navigation location="/">
        <Navigation.Section
          items={[
            {
              url: '#',
              excludePaths: ['#'],
              label: 'Referral',
              icon:  ShareMinor, 
              selected:open1,
              onClick:()=>{setopen1(!open1)},
             subNavigationItems: [
              {
                url: '#',
                excludePaths: ['#'],
                disabled:false,
                label: 'Campaigns',
                onClick:()=>{navigate("/pricerule")}
              },
              {
                url: '#',
                excludePaths: ['#'],
                disabled:false,
                label: 'Members',
                onClick:()=>{navigate("/member")}
              },
              {
                url: '#',
                excludePaths: ['#'],
                disabled:false,
                label: 'Sales',
                onClick:()=>{navigate("/refe_sale")}
              },
              {
                url: '#',
                excludePaths: ['#'],
                disabled:false,
                label: 'Settings',
                onClick:()=>{navigate("/settings")}
              }],
            },

            {
              url: '#',
              excludePaths: ['#'],
              label: 'Affiliate',
              icon:  ThumbsUpMajor,
              selected:open,
              onClick:()=>{setopen(!open)},
              subNavigationItems: [
                {
                  url: '#',
                  excludePaths: ['#'],
                  disabled:false,
                  label: 'Campaigns',
                  onClick:()=>{navigate("/affiliate")}
                },
                {
                  url: '#',
                  excludePaths: ['#'],
                  disabled:false,
                  label: 'Influencer',
                  onClick:()=>{navigate("/influencer")}
                },
                {
                  url: '#',
                  excludePaths: ['#'],
                  disabled:false,
                  label: 'Sales',
                  onClick:()=>{navigate("/aff_sale")}
                },
                {
                  url: '#',
                  excludePaths: ['#'],
                  disabled:false,
                  label: 'Settings',
                  onClick:()=>{navigate("/setting")}
                }
              ],
            },
           
              {
                url: '#',
                excludePaths: ['#'],
                label: 'Payout',
                icon: PaymentsMajor,
                onClick:()=>{navigate("/payout")}
              },
              {
                url: '#',
                excludePaths: ['#'],
                label: 'Commission',
                icon:TransactionFeeRupeeMajor,
                onClick:()=>{navigate("/commission")}
              },
              /*{
                url: '#',
                excludePaths: ['#'],
                label: 'Setting',
                icon: SettingsMajor,
                selected:open2,
              onClick:()=>{setopen2(!open2)},
              subNavigationItems: [
                {
                  url: '#',
                  excludePaths: ['#'],
                  disabled:false,
                  label: 'Mail Templates',
                  onClick:()=>{navigate("/template")}
                },]
              },*/
            
          ]}
        
              
                
        />
      </Navigation>
    </Frame>
             
                   
        
     
   
  );
}
