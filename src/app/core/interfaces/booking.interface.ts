export interface Booking{
    booking_id: number,
    guest_name: string,
    phone_number: string,
    date_time_check_in: Date,
    date_time_check_out: Date,
    person_count: number,
    child_count: number,
    room_id: number,
    total_price: number,
    addon_price?: number,
    advance_amount: number,
    gst: number
}

export interface BookingNoID{
    guest_name: string,
    phone_number: string,
    date_time_check_in: Date,
    date_time_check_out: Date,
    person_count: number,
    child_count: number,
    room_id: number,
    total_price: number,
    addon_price?: number,
    advance_amount: number,
    gst: number
}