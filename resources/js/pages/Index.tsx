import React from 'react';
import { WorldHabitatLanding } from '@/components/Frontend/WorldHabitatLanding';

type HeroModel = {
    description?: string | null;
    logo?: string | null;
};

type EventStatModel = {
    event_name?: string | null;
    location?: string | null;
    event_date?: string | null;
    time?: string | null;
};

type AboutModel = {
    description?: string | null;
    reason_to_attend?: string | null;
    objectives?: string | null;
};

type ProgramHighlightModel = {
    id?: number | string;
    title?: string | null;
    description?: string | null;
    logo?: string | null;
};

type GuestModel = {
    id?: number | string;
    name?: string | null;
    designation?: string | null;
    description?: string | null;
    logo?: string | null;
    expertise?: string | null;
    type?: string | null;
};

type ScheduleModel = {
    id?: number | string;
    title?: string | null;
    description?: string | null;
    time?: string | null;
    badge?: string | null;
    location?: string | null;
    keynote_speaker?: string | null;
};

type ParticipantTypeModel = {
    id?: number | string;
    name?: string | null;
};

type LocationModel = {
    id?: number | string;
    address?: string | null;
    phone?: string | null;
    email?: string | null;
    map?: string | null;
};

type PartnerModel = {
    id?: number | string;
    name?: string | null;
    logo?: string | null;
    featured?: boolean | number | null;
    partnership_category?: {
        id?: number | string;
        name?: string | null;
    } | null;
};

type LeadershipModel = {
    id?: number | string;
    name?: string | null;
    role?: string | null;
    ministry?: string | null;
    logo?: string | null;
};

type SocialMediaModel = {
    id?: number | string;
    facebook?: string | null;
    linkedin?: string | null;
    youtube?: string | null;
    twitter?: string | null;
};

export default function Home({
    hero,
    eventStat,
    about,
    programHighlights,
    guests,
    schedules,
    participantTypes,
    location,
    partners,
    leaderships,
    socialMedia,
}: {
    hero?: HeroModel | null;
    eventStat?: EventStatModel | null;
    about?: AboutModel | null;
    programHighlights?: ProgramHighlightModel[] | null;
    guests?: GuestModel[] | null;
    schedules?: ScheduleModel[] | null;
    participantTypes?: ParticipantTypeModel[] | null;
    location?: LocationModel | null;
    partners?: PartnerModel[] | null;
    leaderships?: LeadershipModel[] | null;
    socialMedia?: SocialMediaModel | SocialMediaModel[] | null;
}) {
    return <WorldHabitatLanding hero={hero} eventStat={eventStat} about={about} programHighlights={programHighlights} guests={guests} schedules={schedules} participantTypes={participantTypes} location={location} partners={partners} leaderships={leaderships} socialMedia={socialMedia} />;
}

Home.layout = null;
