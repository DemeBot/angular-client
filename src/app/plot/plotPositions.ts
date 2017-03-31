export class PlotPosition {

    // DB assigned ID. Should only be generated by DB, therefore is readonly.
    readonly id?: number;

    // Radial position value. Unit: mm. Represents the distance from the center of the position to the center of the DemeBot center pivot.
    r: number;

    // Theta angle value. Unit: degrees. Represents the angular distance from the DemeBot's most clockwise reach to the position the DemeBot's arms must be to reach the posistion.
    t: number;

    // Z position value. Unit: mm. Represents the vertical distance of the position.
    z: number;

    // Date the data entry was marked as ended. Kept for accounting purposes.
    ended_at?: Date;

    // Date the data entry was created. Kept for accounting purposes.
    created_at?: Date;

}

export default PlotPosition;