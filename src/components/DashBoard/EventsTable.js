import React from 'react';
import { useSelector } from "react-redux";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { HiClock } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import { formattedDate } from "../../utils/dataFormatter";
import {
  deleteEvent,
  fetchOrganizerEvents,
} from "../../services/operations/eventAPI";
import { EVENT_STATUS } from "../../utils/constant";
import ConfirmationModal from "../../components/common/ConfirmationModal";

const EventsTable = ({ events, setEvent }) => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const TRUNCATE_LENGTH = 10;

  const handleEventDelete = async (eventId) => {
    setLoading(true);
    await deleteEvent({ eventId: eventId }, token);
    const result = await fetchOrganizerEvents(token);
    if (result) {
      setEvent(result);
    }
    setConfirmationModal(null);
    setLoading(false);
  };

  return (
    <div className="p-2">
      <Table className="rounded-xl border border-richblack-800">
        <Thead>
          <Tr className="w-full flex rounded-t-md border-b border-b-richblack-800 px-4 py-2">
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Events
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {events.length === 0 ? (
            <Tr className="flex justify-center">
              <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                No events found
              </Td>
            </Tr>
          ) : (
            events?.map((event) => {
              return (
                <div key={event._id} className="flex flex-row gap-3 lg:gap-10 p-[24px]">
                  <div className="">
                   <div className='flex flex-col lg:flex-row gap-x-4'>
                        <img
                        src={event?.thumbnail}
                        alt={event?.eventName}
                        className="lg:h-[148px] lg:w-[220px] rounded-lg object-cover"
                        />
                        <div className="flex flex-col gap-2">
                            <p className="text-lg font-semibold text-richblack-5">
                                {event.eventName}
                            </p>
                            {/* <p className="text-xs text-richblack-300 w-[300px] lg:w-auto">
                                {event.eventDescription.split(" ").length >
                                TRUNCATE_LENGTH
                                ? event.eventDescription
                                    .split(" ")
                                    .slice(0, TRUNCATE_LENGTH)
                                    .join(" ") + "..."
                                : event.eventDescription}
                            </p> */}
                            {event.status === EVENT_STATUS.DRAFT ? (
                                <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                                <HiClock size={14} />
                                Drafted
                                </p>
                            ) : (
                                <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                                <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                                    <FaCheck size={8} />
                                </div>
                                Published
                                </p>
                            )}
                        </div>
                   </div>
                  </div>
                  <div className="text-sm font-medium text-richblack-100">
                    <button
                      disabled={loading}
                      onClick={() => {
                        navigate(`/dashboard/edit-event/${event._id}`);
                      }}
                      title="Edit"
                      className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                    >
                      <FiEdit2 size={20} />
                    </button>
                    <button
                      disabled={loading}
                      onClick={() => {
                        setConfirmationModal({
                          text1: "Do you want to delete this Event?",
                          text2: "All the data related to this event will be deleted",
                          btn1Text: !loading ? "Delete" : "Loading...",
                          btn2Text: "Cancel",
                          btn1Handler: !loading
                            ? () => handleEventDelete(event._id)
                            : () => {},
                          btn2Handler: !loading
                            ? () => setConfirmationModal(null)
                            : () => {},
                        });
                      }}
                      title="Delete"
                      className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                    >
                      <RiDeleteBin6Line size={20} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </Tbody>
      </Table>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default EventsTable;
