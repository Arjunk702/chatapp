import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { io } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        console.log("req.user:", req.user); // ✅ Debugging log
        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in getUsersForSidebar:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;

        console.log("userToChatId:", userToChatId); // ✅ Debugging
        console.log("myId:", myId); // ✅ Debugging

        // Check if the userToChatId exists in the database
        const userExists = await User.findById(userToChatId);
        if (!userExists) {
            console.log("User not found!"); // ✅ Debugging
            return res.status(404).json({ error: "User not found" });
        }

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        }).sort({ createdAt: 1 });

        res.status(200).json(messages);
    } catch (error) {
        console.log('Error in getMessage controller:', error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id; // FIXED: changed req.User to req.user

        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });
        await newMessage.save();

        // Convert Mongoose document to a plain JSON-safe object before emitting via Socket.IO
        // This avoids serialization issues with MongoDB ObjectIds and Mongoose internals
        const messageJSON = newMessage.toObject();
        messageJSON._id = messageJSON._id.toString();
        messageJSON.senderId = messageJSON.senderId.toString();
        messageJSON.receiverId = messageJSON.receiverId.toString();
        messageJSON.createdAt = messageJSON.createdAt?.toISOString();
        messageJSON.updatedAt = messageJSON.updatedAt?.toISOString();

        // Realtime: deliver message to both participants (supports multi-device)
        io.to(receiverId.toString()).emit("newMessage", messageJSON);
        io.to(senderId.toString()).emit("newMessage", messageJSON);

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
