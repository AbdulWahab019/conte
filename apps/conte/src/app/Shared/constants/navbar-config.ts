import { NavbarComponentModel } from "../../Shared/models/NavbarComponentModel";

export const NAVBAR_COMPONENTS: NavbarComponentModel[] = [
    {
        title: 'Dashboard',
        activePath: '/dashboard/users',
        svgSrc: '/assets/icons/dashboard.svg',
        activeSvgSrc: '/assets/icons/dashboard-active.svg',
    },
    {
        title: 'Treatment Plans',
        activePath: '/dashboard/treatment-plans',
        svgSrc: '/assets/icons/treatmentplan.svg',
        activeSvgSrc: '/assets/icons/treatmentplan-active.svg',
    },
];
