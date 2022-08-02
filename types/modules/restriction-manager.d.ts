import EventEmitter from "events";
import { RestrictionType } from "../restrictions";

export type RestrictionManager = EventEmitter & {
    registerRestriction: <RestrictionModel>(
        restriction: RestrictionType<RestrictionModel>
    ) => void;
};
